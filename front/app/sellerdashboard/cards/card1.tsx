export default function Card1(){
    return(
        <div className="md:w-11/12">
            <div className="flex md:flex-row space-x-8"></div>
        <div className="shadow-md p-4">
                    <div className="">
                        <div className="flex flex-col">
                            <div className="flex space-x-8 w-56">
                                <div className="">
                                    <div className="uppercase text-sm text-gray-400">
                                        Occupied
                                    </div>
                                <div className="mt-1">
                                        <div className="flex space-x-2 items-center">
                                            <div className="text-2xl">
                                                35
                                            </div>
                                            <div className="text-xs text-green-800 bg-green-200 rounded-md p-1">
                                                +4.5%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
                </div>
    )
}