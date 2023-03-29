export const Card = (props) => {
    return( 
    <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
        <div className={`card border-${props.colour}`}>
            <h5 className={`card-header text-white bg-${props.colour}`}>{props.title}</h5>
            <div className="card-body">
                <h1 className="card-title">{props.count}</h1>
            </div>
        </div>
    </div>
    )
}