import React from 'react'

const Stats = [
    {count : "5K" , label : "Active Students"},
    {count : "10+" , label : "Mentors"},
    {count : "200+" , label : "Courses"},
    {count : "50+" , label : "Awards"}
]
const StatsComponent = () => {
    return (
        <section className="bg-richblack-700 flex items-center justify-center h-[150px] mt-[50px]">
            <div className="w-11/12 max-w-maxContent">
                <div className="w-[100%] flex justify-center px-4 gap-2">
                {
                    Stats.map((element , index) => {
                        
                        return (
                            <div className="flex flex-col  gap-1 w-[20%] items-center" key={index}>
                                <p className="text-3xl font-semibold">{element.count}</p>
                                <p className="text-sm text-[#585D69]">{element.label}</p>
                            </div>
                        )
                        
                    })
                }
                </div>
            </div>
        </section>
    )
}

export default StatsComponent;