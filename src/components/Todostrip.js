"use client"
import { useState } from "react"
import { Trash2, Clock, Play, CheckCircle2, X } from "lucide-react"

function Todostrip(props) {
  const [statusIs, setStatusIs] = useState(props.Task.status)

  const statusConfig = {
    "⌚Pending": { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
    "🏃Inprogress": { icon: Play, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    "✔️Completed": { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
    "✖️Cancelled": { icon: X, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30" },
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const currentStatus = statusConfig[statusIs] || statusConfig["⌚Pending"]
  const StatusIcon = currentStatus.icon

  return (
    <div className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-4">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{props.Task.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{props.Task.description}</p>
        </div>
        <button
          className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200 group"
          onClick={() => props.deletetask(props.index)}
        >
          <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <StatusIcon className={`w-4 h-4 ${currentStatus.color}`} />
          <select
            className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${currentStatus.bg} ${currentStatus.color}`}
            value={statusIs}
            onChange={(e) => {
              props.updatestatus(props.index, e.target.value)
              setStatusIs(e.target.value)
            }}
          >
            {props.status.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="text-xs text-gray-400">{formatDate(props.Task.updated_at)}</div>
      </div>
    </div>
  )
}

export default Todostrip
