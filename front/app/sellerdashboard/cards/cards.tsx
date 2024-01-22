import Card1 from "./card1"
import Card2 from "./card2"
import Card3 from "./card3"
import Card4 from "./card4"
import "../cards/cards.css"
export default function Cards(){
    return (
        <div className=" container  ml-[20%] w-[20%] h-[100%] ">
        <div className="md:w-11/12">
            <div className="flex md:flex-row space-x-8">
                <Card1/>
                <Card2/>
                <Card3/>
                <Card4/>
               
            </div>
        </div>
    </div>
    )
}