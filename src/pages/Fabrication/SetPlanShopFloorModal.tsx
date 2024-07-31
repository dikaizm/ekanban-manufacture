import { MdClose, MdEditSquare } from "react-icons/md";
import MainTitle, { TitleSize } from "../../components/Title/MainTitle";
import InputText from "../../components/Input/InputText";
import PrimaryButton from "../../components/PrimaryButton";
import toast from "react-hot-toast";
import { useSecureApi } from "../../provider/utils/secureApiContext";
import { useEffect, useState } from "react";

export default function SetPlanShopFloorModal({ id, onClose }: { id: number, onClose?: () => void }) {
  const { secureApi } = useSecureApi()
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    planStartDate: '',
    planStartTime: '',
    planFinishDate: '',
    planFinishTime: '',
  });

  useEffect(() => {
    const fetchShopFloor = async () => {
      try {
        const response = await secureApi(`/fabrication/shop-floors/${id}`).then(res => res.json());
        if (!response.success) {
          toast.error(response.message);
          return;
        }

        if (response.data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const updateFormData = (dateField: any, formFields: any) => {
            if (response.data[dateField]) {
              const date = new Date(response.data[dateField]);
              const [dateStr, timeStr] = date.toISOString().split('T');
              setFormData(prev => ({
                ...prev,
                [formFields.date]: dateStr,
                [formFields.time]: timeStr.slice(0, 5)
              }));
            }
          };

          updateFormData('planStart', { date: 'planStartDate', time: 'planStartTime' });
          updateFormData('planFinish', { date: 'planFinishDate', time: 'planFinishTime' });
        }
      } catch (error) {
        toast.error("Failed to fetch shop floor");
      }
    };

    fetchShopFloor();
  }, [id, secureApi]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const inputValidation = () => {
    if (!formData.planStartDate) {
      toast.error('Planned start date is required')
      return false
    }
    if (!formData.planStartTime) {
      toast.error('Planned start time is required')
      return false
    }
    if (!formData.planFinishDate) {
      toast.error('Planned finish date is required')
      return false
    }
    if (!formData.planFinishTime) {
      toast.error('Planned finish time is required')
      return false
    }

    return true
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSetPlan = async (event: any) => {
    event.preventDefault()

    if (!inputValidation()) return
    setLoadingSubmit(true)

    try {
      // Create plan start datetime
      const planStart = new Date(`${formData.planStartDate}T${formData.planStartTime}:00`);
      // Create plan finish datetime
      const planFinish = new Date(`${formData.planFinishDate}T${formData.planFinishTime}:00`);

      // Convert to ISO string with local timezone offset
      const planStartLocal = planStart.toLocaleString('sv-SE').replace(' ', 'T');
      const planFinishLocal = planFinish.toLocaleString('sv-SE').replace(' ', 'T');

      const data = { id, planStart: planStartLocal, planFinish: planFinishLocal };
      console.log(data);

      const response = await secureApi('/fabrication/shop-floors/plan', {
        method: 'PUT',
        options: {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(res => res.json())

      console.log(response)

      if (!response.success) {
        toast.error(response.message)
      } else {
        toast.success(response.message)
        onClose && onClose()
      }

    } catch (error) {
      toast.error("Failed to set plan")
    } finally {
      setLoadingSubmit(false)
    }
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute w-full h-full bg-black/30" />

      <div className="relative max-h-[32rem] bg-white rounded-xl w-[32rem]">
        {/* Row header */}
        <div className="flex justify-between px-4 py-3">
          {/* Row icon & title */}
          <div className="flex items-center gap-3">
            <div className="p-[0.4rem] border border-slate-400 rounded-full">
              <MdEditSquare className="w-5 h-5 text-blue-500" />
            </div>
            <MainTitle textSize={TitleSize.small}>Set Plan</MainTitle>
          </div>

          {/* Close button */}
          <button className="flex items-center justify-center w-8 h-8 p-1 text-gray-500 border rounded-full hover:bg-slate-200" onClick={onClose}>
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        <hr />

        {/* Content */}
        <div className='p-4 overflow-y-auto max-h-[32rem]'>
          <form>
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <InputText
                  type="date"
                  label="Planned Start Date"
                  id="planStartDate"
                  value={formData.planStartDate}
                  onChange={handleInputChange}
                  required={true}
                />
                <InputText
                  type="time"
                  label="Planned Start Time"
                  id="planStartTime"
                  value={formData.planStartTime}
                  onChange={handleInputChange}
                  required={true}
                />
              </div>
              <hr />
              <div className="flex gap-3">
                <InputText
                  type="date"
                  label="Planned Finish Date"
                  id="planFinishDate"
                  value={formData.planFinishDate}
                  onChange={handleInputChange}
                  required={true}
                />
                <InputText
                  type="time"
                  label="Planned Finish Time"
                  id="planFinishTime"
                  value={formData.planFinishTime}
                  onChange={handleInputChange}
                  required={true}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <PrimaryButton onClick={onClose} style="outline">Cancel</PrimaryButton>
              <PrimaryButton onClick={handleSetPlan} type="submit" disabled={loadingSubmit}>{loadingSubmit ? 'Saving...' : 'Save'}</PrimaryButton>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}