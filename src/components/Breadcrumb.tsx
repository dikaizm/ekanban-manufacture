type BreadcrumbType = {
  items: {
    label: string;
    link?: string;
  }[]
};

export default function Breadcrumb({ items }: BreadcrumbType) {
  return (
    <div className="px-6 pt-4 w-fit">
      <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          {items.map((item, index) => (
            <li key={index} aria-current={index === items.length - 1 ? "page" : undefined}>
              <div className="flex items-center">
                {index > 0 && (
                  <svg className="w-3 h-3 mx-1 mr-2 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                )}
                {item.link ? (
                  <span className="text-sm font-medium text-gray-400">{item.label}</span>
                ) : (
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}