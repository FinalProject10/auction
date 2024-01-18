import "./page.css"
export default function Header(){
    return(
        <div className="header">
            <div className="autobid-breadcrumbs">
                <div className="container">
                    <div className="row"></div>
                    <div className="col-md-12">
                        <ol className="breadcrumbs">
                            <li>
                                <a href="#">
                                    Home
                                </a>
                            </li>
                            <li className="active">
                               Dashboard
                            </li>

                        </ol>
                    </div>
                    <div className="col-md-12">
                        <h2>Dashboard</h2>
                    </div>

                </div>
            </div>
        </div>
    )
}