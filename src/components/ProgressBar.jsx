function ProgressBar({ tasks }) {
    const completed =
        tasks.filter((t) => t.completed).length;

    const percentage =
        tasks.length
            ? (completed / tasks.length) * 100
            : 0;

    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium text-slate-700">
                    Progress
                </h3>

                <span className="text-sm text-slate-500">
                    {completed}/{tasks.length}
                </span>
            </div>

            <div className="h-3 rounded-full bg-slate-200">
                <div
                    className="h-3 rounded-full bg-blue-500 transition-all duration-300"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>
        </div>
    );
}

export default ProgressBar;