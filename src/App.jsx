import React, { useState, useMemo } from "react";
import {
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

// Mock data for academic records
const mockRecords = [
  {
    id: 1,
    year: 2025,
    title:
      "Development, Characterization, and Antimicrobial Evaluation of Hybrid Nanoparticles (HNPs)",
    group: "GEFME",
    faculty: "Ciencias Básicas",
    type: "2025A",
    journal: "Semillero de Investigación",
    doi: "10.3876/rcsv3fll.43493",
  },
  {
    id: 2,
    year: 2025,
    title: "Actinomycosis: Mimicking Malignancies in Multiple Anatomical Sites",
    group: "COMBAHQ IGMAISDA",
    faculty: "Ciencias Básicas",
    type: "2025A",
    journal: "Pathogens",
    doi: "10.3876/rcsv3fll.43493",
  },
  {
    id: 3,
    year: 2024,
    title:
      "Machine Learning Applications in Medical Diagnosis: A Comprehensive Review",
    group: "AI Research",
    faculty: "Ingeniería",
    type: "2024B",
    journal: "IEEE Transactions",
    doi: "10.1109/example.2024.123456",
  },
  {
    id: 4,
    year: 2024,
    title: "Sustainable Development Goals and Environmental Impact Assessment",
    group: "ENVIRO",
    faculty: "Ciencias Ambientales",
    type: "2024A",
    journal: "Environmental Science",
    doi: "10.1016/j.envres.2024.01234",
  },
  {
    id: 5,
    year: 2024,
    title:
      "Blockchain Technology in Healthcare: Security and Privacy Considerations",
    group: "CYBERSEC",
    faculty: "Ingeniería",
    type: "2024B",
    journal: "Computer Security",
    doi: "10.1007/s00123-024-5678",
  },
  {
    id: 6,
    year: 2023,
    title: "Novel Approaches to Cancer Treatment Using Immunotherapy",
    group: "ONCOLOGY",
    faculty: "Medicina",
    type: "2023B",
    journal: "Nature Medicine",
    doi: "10.1038/nm.2023.123",
  },
  {
    id: 7,
    year: 2023,
    title:
      "Climate Change Impact on Agricultural Productivity in Latin America",
    group: "AGRITECH",
    faculty: "Ciencias Agrarias",
    type: "2023A",
    journal: "Agricultural Systems",
    doi: "10.1016/j.agsy.2023.456",
  },
];

function AcademicRecordsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  const [editingPage, setEditingPage] = useState(false);
  const [tempPage, setTempPage] = useState(1);

  const totalItems = mockRecords.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return mockRecords.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);

  const getStartItem = () => (currentPage - 1) * itemsPerPage + 1;
  const getEndItem = () => Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const pages = [];
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const changeItemsPerPage = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setShowItemsDropdown(false);
  };

  const startEditingPage = () => {
    setEditingPage(true);
    setTempPage(currentPage);
  };

  const finishEditingPage = () => {
    const page = parseInt(tempPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
    setEditingPage(false);
  };

  const cancelEditingPage = () => {
    setEditingPage(false);
    setTempPage(currentPage);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      finishEditingPage();
    } else if (e.key === "Escape") {
      cancelEditingPage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 font-inter">
      <div className="flex flex-col h-full">
        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Header Card */}
            <div className="card overflow-hidden mb-6 md:mb-8">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 border-b border-slate-200 bg-white gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary-700" />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-primary-700">
                    Registros Académicos
                  </h2>
                </div>
                <div className="bg-primary-100 px-3 md:px-4 py-1.5 md:py-2 rounded-lg">
                  <span className="text-xs md:text-sm font-semibold text-primary-700">
                    {totalItems} Registros
                  </span>
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="table-header">
                    <tr>
                      <th className="px-2 md:px-4 py-3 md:py-4 text-left font-semibold text-xs uppercase tracking-wider text-slate-600">
                        #
                      </th>
                      <th className="px-2 md:px-4 py-3 md:py-4 text-left font-semibold text-xs uppercase tracking-wider text-slate-600">
                        Año
                      </th>
                      <th className="px-2 md:px-4 py-3 md:py-4 text-left font-semibold text-xs uppercase tracking-wider text-slate-600 min-w-[200px] md:min-w-[280px]">
                        Título
                      </th>
                      <th className="px-2 md:px-4 py-3 md:py-4 text-left font-semibold text-xs uppercase tracking-wider text-slate-600 hidden lg:table-cell">
                        Grupo
                      </th>
                      <th className="px-2 md:px-4 py-3 md:py-4 text-left font-semibold text-xs uppercase tracking-wider text-slate-600 hidden md:table-cell">
                        Facultad
                      </th>
                      <th className="px-2 md:px-4 py-3 md:py-4 text-left font-semibold text-xs uppercase tracking-wider text-slate-600 hidden xl:table-cell">
                        Tipo
                      </th>
                      <th className="px-2 md:px-4 py-3 md:py-4 text-left font-semibold text-xs uppercase tracking-wider text-slate-600 hidden lg:table-cell">
                        Revista
                      </th>
                      <th className="px-2 md:px-4 py-3 md:py-4 text-left font-semibold text-xs uppercase tracking-wider text-slate-600 hidden xl:table-cell">
                        DOI
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {currentRecords.map((record, index) => (
                      <tr
                        key={record.id}
                        className="hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-transparent transition-all duration-200 ease-in-out hover:transform hover:translate-x-1"
                      >
                        <td className="px-2 md:px-4 py-3 md:py-5 text-xs md:text-sm text-slate-900 border-b border-slate-200">
                          {getStartItem() + index}
                        </td>
                        <td className="px-2 md:px-4 py-3 md:py-5 text-xs md:text-sm text-slate-900 border-b border-slate-200">
                          {record.year}
                        </td>
                        <td className="px-2 md:px-4 py-3 md:py-5 text-xs md:text-sm text-slate-900 border-b border-slate-200 max-w-[200px] md:max-w-[280px]">
                          <div className="truncate" title={record.title}>
                            {record.title}
                          </div>
                        </td>
                        <td className="px-2 md:px-4 py-3 md:py-5 text-xs md:text-sm text-slate-900 border-b border-slate-200 hidden lg:table-cell">
                          {record.group}
                        </td>
                        <td className="px-2 md:px-4 py-3 md:py-5 text-xs md:text-sm text-slate-900 border-b border-slate-200 hidden md:table-cell">
                          {record.faculty}
                        </td>
                        <td className="px-2 md:px-4 py-3 md:py-5 text-xs md:text-sm text-slate-900 border-b border-slate-200 hidden xl:table-cell">
                          {record.type}
                        </td>
                        <td className="px-2 md:px-4 py-3 md:py-5 text-xs md:text-sm text-slate-900 border-b border-slate-200 hidden lg:table-cell">
                          {record.journal}
                        </td>
                        <td className="px-2 md:px-4 py-3 md:py-5 text-xs md:text-sm text-slate-900 border-b border-slate-200 hidden xl:table-cell">
                          {record.doi}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer */}
              <div className="flex flex-col lg:flex-row gap-4 md:gap-6 p-4 md:p-6 border-t border-slate-200 bg-slate-50">
                {/* Items per page and count info */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs md:text-sm font-medium text-slate-600">
                      Mostrar
                    </span>
                    <div className="relative">
                      <button
                        onClick={() => setShowItemsDropdown(!showItemsDropdown)}
                        className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-white border border-slate-200 rounded-lg text-xs md:text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-primary-300 transition-all duration-200"
                      >
                        <span>{itemsPerPage}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${showItemsDropdown ? "rotate-180" : ""}`}
                        />
                      </button>
                      {showItemsDropdown && (
                        <div className="dropdown">
                          {[5, 10, 25, 50, 100].map((value) => (
                            <button
                              key={value}
                              onClick={() => changeItemsPerPage(value)}
                              className="dropdown-item w-full text-left"
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-slate-600">
                      registros por página
                    </span>
                  </div>

                  <div className="text-sm font-medium text-slate-600">
                    <span>Mostrando </span>
                    <span className="font-semibold text-slate-800">
                      {getStartItem()}
                    </span>
                    <span> a </span>
                    <span className="font-semibold text-slate-800">
                      {getEndItem()}
                    </span>
                    <span> de </span>
                    <span className="font-semibold text-slate-800">
                      {totalItems}
                    </span>
                    <span> registros</span>
                  </div>
                </div>

                {/* Page navigation */}
                <div className="flex flex-col gap-4 lg:ml-auto">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-medium text-slate-600">
                      Ir a página:
                    </span>
                    {!editingPage ? (
                      <button
                        onClick={startEditingPage}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-primary-300 transition-all duration-200 min-w-[60px]"
                      >
                        {currentPage}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max={totalPages}
                          value={tempPage}
                          onChange={(e) => setTempPage(e.target.value)}
                          onKeyDown={handleKeyPress}
                          className="w-16 px-2 py-1.5 border border-primary-700 rounded-md text-sm font-medium text-slate-700 text-center focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={finishEditingPage}
                          className="p-1.5 bg-primary-700 text-white rounded-md hover:bg-primary-800 transition-colors duration-200"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEditingPage}
                          className="p-1.5 bg-slate-500 text-white rounded-md hover:bg-slate-600 transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <span className="text-sm font-medium text-slate-600">
                      <span>de </span>
                      <span className="font-semibold text-slate-800">
                        {totalPages}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => goToPage(currentPage - 1)}
                      className="flex items-center justify-center w-10 h-10 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 hover:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1">
                      {getVisiblePages().map((page, index) => (
                        <React.Fragment key={index}>
                          {page !== "..." ? (
                            <button
                              onClick={() => goToPage(page)}
                              className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                                page === currentPage
                                  ? "bg-primary-700 text-white shadow-primary"
                                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-primary-300 hover:text-primary-700"
                              }`}
                            >
                              {page}
                            </button>
                          ) : (
                            <span className="flex items-center justify-center w-10 h-10 text-slate-500">
                              ...
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                      <span>Página</span>
                      <span className="font-semibold text-slate-800">
                        {currentPage}
                      </span>
                      <span>de</span>
                      <span className="font-semibold text-slate-800">
                        {totalPages}
                      </span>
                    </div>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => goToPage(currentPage + 1)}
                      className="flex items-center justify-center w-10 h-10 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 hover:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicRecordsTable;
