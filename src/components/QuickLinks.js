"use client";
import { ExternalLink, Github, Mail, Calendar, FileText } from "lucide-react";

const quickLinks = [
    { name: "Gmail", url: "https://gmail.com", icon: Mail, color: "text-red-500" },
    { name: "GitHub", url: "https://github.com", icon: Github, color: "text-gray-800 dark:text-white" },
    { name: "Calendar", url: "https://calendar.google.com", icon: Calendar, color: "text-blue-500" },
    { name: "Drive", url: "https://drive.google.com", icon: FileText, color: "text-green-500" },
];

export default function QuickLinks() {
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <ExternalLink className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-light text-gray-700 dark:text-gray-200">Quick Links</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {quickLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                    >
                        <link.icon className={`w-5 h-5 ${link.color}`} />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
                            {link.name}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}