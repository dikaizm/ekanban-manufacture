import { useParams } from "react-router-dom";
import AuthenticatedLayout from "../components/AuthenticatedLayout";

export default function ConfirmKanbanPage() {
    const { cardId } = useParams()

    return (
        <AuthenticatedLayout>
            <div>
                <h1>Confirm Kanban</h1>
                <p>Card ID: {cardId}</p>
            </div>
        </AuthenticatedLayout>
    )
}