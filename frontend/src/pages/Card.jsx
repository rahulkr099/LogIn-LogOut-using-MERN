

function Card({prop}) {
    console.log('item',prop)
  return (
    <div className="">
        <div className='border border-black rounded-md w-64 m-4 p-4'>
            <div className="w-44 h-64">
                <img src={prop.image} alt={prop.category}/>
                
            </div>
            <div>
                <h5 className="text-xl">{prop.title}</h5>
                <h5 className="text-2xl border-b border-black">Rs.{prop.price}</h5>
                <p>{prop.description.substring(0,100)}</p>
            </div>
            <button className="bg-green-400 p-2 rounded-lg m-2 hover:text-white border-green-900">Add to Card</button>
        </div>
    </div>

  )
}

export default Card