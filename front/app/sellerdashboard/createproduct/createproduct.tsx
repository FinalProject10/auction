export default function AddProduct(){
    return (
        <>
        <div className="p-8 rounded border border-gray-200">
       
        <p className="text-gray-600 mt-6">Please fill in these labels with the informations of the product you want to add.</p>
      
        <form>
          <div className="mt-8 space-y-6">
            <div>
              <label  className="text-sm text-gray-700 block mb-1 font-medium">Name</label>
              <input type="text" name="name" id="name" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Product Name" />
            </div>
            <div>
              <label  className="text-sm text-gray-700 block mb-1 font-medium">Initial Price</label>
              <input type="text" name="job" id="job" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Initial Price" />
            </div>
            <div>
              <label  className="text-sm text-gray-700 block mb-1 font-medium">Time Start</label>
              <input type="text" name="email" id="email" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="yourmail@provider.com" />
            </div>
      
            <div>
              <label  className="text-sm text-gray-700 block mb-1 font-medium">Time End</label>
              <input type="text" name="job" id="job" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Time End" />
            </div>
            <div >
              <label  className="text-sm text-gray-700 block mb-1 font-medium">Images</label>
              <input type="text" name="job" id="job" className="bg-gray-100 border mb-1 border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Image1" />
              <input type="text" name="job" id="job" className="bg-gray-100 border mb-1 border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Image2" />
              <input type="text" name="job" id="job" className="bg-gray-100 border mb-1 border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Image3" />
              <input type="text" name="job" id="job" className="bg-gray-100 border mb-1 border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Image4" />
            </div>
            <div>
              <label  className="text-sm text-gray-700 block mb-1 font-medium">Description</label>
              <input type="text" name="job" id="job" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Description" />
            </div>
          </div>
      
        
        </form>
      </div>
      </>
    )
}