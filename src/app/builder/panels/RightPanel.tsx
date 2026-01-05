// right panel - profile/section settings

"use client";

import React from "react";
import { useBuilderStore, useSelectedSectionData } from "../state";
import { ProfileEditor } from "../controls/ProfileEditor";
import { SectionSettings } from "../controls/SectionSettings";

export const RightPanel: React.FC = () => {
    const { rightPanelView, setRightPanelView, selectedSection, clearSectionSelection } = useBuilderStore();
    const selectedSectionData = useSelectedSectionData();

    return (
        <div className="flex flex-col h-full">
            {/* header */}
            <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {rightPanelView === "profile" ? "Profile Data" : "Section Settings"}
                </h2>
            </div>

            {/* tabs */}
            <div className="flex-shrink-0 flex border-b border-gray-200 dark:border-gray-800">
                <button
                    onClick={() => {
                        setRightPanelView("profile");
                        clearSectionSelection();
                    }}
                    className={`
            flex-1 px-4 py-2.5 text-sm font-medium transition-colors
            ${rightPanelView === "profile"
                            ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                        }
          `}
                >
                    Profile
                </button>
                <button
                    onClick={() => setRightPanelView("section-settings")}
                    disabled={!selectedSection}
                    className={`
            flex-1 px-4 py-2.5 text-sm font-medium transition-colors
            ${!selectedSection ? "opacity-50 cursor-not-allowed" : ""}
            ${rightPanelView === "section-settings"
                            ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                        }
          `}
                >
                    Section
                </button>
            </div>

            {/* content */}
            <div className="flex-1 overflow-y-auto">
                {rightPanelView === "profile" && <ProfileEditor />}
                {rightPanelView === "section-settings" && selectedSectionData && (
                    <SectionSettings section={selectedSectionData} />
                )}
                {rightPanelView === "section-settings" && !selectedSectionData && (
                    <div className="p-4 text-center text-gray-500">
                        <p className="text-sm">No section selected</p>
                        <p className="text-xs mt-1">Click a section in the left panel to edit its settings</p>
                    </div>
                )}
            </div>
        </div>
    );
};
