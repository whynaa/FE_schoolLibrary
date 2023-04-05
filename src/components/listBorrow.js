export const ListBorrow = (props) => {
    return( 
        <table className="table table-responsive table-hover">
            <thead className="table-secondary">
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Tgl Peminjaman</th>
                <th scope="col">Batas Pengembalian</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {props.member.map((item, index) => (
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td><button className='btn btn-primary mx-1 text-white' onClick={() => props.select(item.id)}>select</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}