import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import ProjectHeader from "./Components/ProjectHeader";
import ProjectTable from "./Components/ProjectTable";
import ProjectModal from "./Components/ProjectModal";

export default function Project() {
    const { projects } = usePage().props;
    // console.log("🚀 ~ Project ~ projects:", projects)

    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Project
                </h2>
            }
        >
            <Head title="Project" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Title and Add Button */}
                            <ProjectHeader
                                onAddClick={() => {
                                    setSelectedProject(null);
                                    setShowModal(true);
                                }}
                            />

                            <ProjectTable
                                projects={projects}
                                onEdit={(project) => {
                                    setSelectedProject(project);
                                    setShowModal(true);
                                }}
                            />

                            {/* Modal */}
                            <ProjectModal
                                show={showModal}
                                onClose={() => setShowModal(false)}
                                project={selectedProject}
                                projects={projects}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
