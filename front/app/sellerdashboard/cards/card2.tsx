export default function Card2(){
    return(
        <div className="md:w-11/12">
            <div className="flex md:flex-row space-x-8"></div>
            <div className="shadow-md p-4">
                    <div className="">
                        <div className="flex flex-col">
                            <div className="flex space-x-8 w-56">
                                <div className="">
                                    <div className="uppercase text-sm text-gray-400">
                                        Unpaid
                                    </div>
                                <div className="mt-1">
                                        <div className="flex space-x-2 items-center">
                                            <div className="text-2xl">
                                                $30,000
                                            </div>
                                            <div className="text-xs text-green-800 bg-green-200 rounded-md p-1">
                                                +4.5%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
                </div>
    )
}