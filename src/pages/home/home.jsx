import './home.css'
import ActionAreaCard from '../../components/ActionAreaCard'
import displayImg from '../../assets/images/cebelar.png'
import cardHive from '../../assets/images/cardHive.jpg'
import cardGraph from '../../assets/images/cardGraph.jpg'
import cardMap from '../../assets/images/cardMap1.jpg'
import cardNotes from '../../assets/images/cardNotes.jpg'

function Home(){
    return(
        <div className="home-container">
            <div className='card-container'>
                <ActionAreaCard img={cardHive} title="Panji" description="cebelarstvo bla bla bla cebele"/>
                <ActionAreaCard img={cardMap} title="Zemljevid" description="cebelarstvo bla bla bla cebele"/>
            </div>

            <div className='status-container'>
                <div>
                <h1>BKeep™</h1>
                <p style={{marginTop: "0%"}}>honey&hives</p>
                </div>
            </div>

            <div className='card-container'>
                <ActionAreaCard img={cardGraph} title="Statistika" description="cebelarstvo bla bla bla cebele"/>
                <ActionAreaCard img={cardNotes} title="Zapiski" description="cebelarstvo bla bla bla cebele"/>
            </div>
        </div>
    )
}

export default Home