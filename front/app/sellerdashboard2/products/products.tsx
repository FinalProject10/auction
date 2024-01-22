import './products.css'
import Table from './table'
export default function Products(){
    return(
        <div className="container">
            <div className="header">
                <div className="stats">
                    <div className="all">
                    <p>All</p>
                    <span>(0)</span>
                    </div>
                    <div className="all">
                    <p>Pending Review</p>
                    <span>(0)</span>
                    </div>
                    <div className="all">
                    <p>In stock</p>
                    <span>(0)</span>
                    </div>
                    
                </div>
                <button className="add-product-button">+ Add New Product</button>
            </div>
             <div className="filter-reset-search">
                    <div className="filter-reset">
                        <input type="text" className='nice-input' />
                        <input type="text" className='nice-input' />
                        <button>filter</button>
                        <button>reset</button>
                    </div>
                    <div className="search">
                    <input type="text" className='nice-input' />
                        <button>search</button>
                    </div>
                </div> 
                <div className="apply">
                    <input type="text" className='nice-input' />
                    <button>Apply</button>
                </div>
                <div className="table">
                <Table/>
                </div>
        </div>
            
    )
}