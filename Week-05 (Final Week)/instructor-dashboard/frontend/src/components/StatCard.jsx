function StatCard({
    title,
    value,
    description,
    icon: Icon
}) {
    return (
    <div className="stat-card">
        <div className="stat-card-top">
        <div className="stat-icon">
            <Icon size={22} />
        </div>
        </div>

        <h3>{value}</h3>
        <p className="stat-title">
        {title}
        </p>

        <span className="stat-description">
        {description}
        </span>
    </div>
    );
}
export default StatCard;