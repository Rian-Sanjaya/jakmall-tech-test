import TabNav from "../components/TabNav";
import BackNav from "../components/BackNav";
import Delivery from "../components/Delivery";
import Summary from "../components/Summary";

function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <TabNav />
        <BackNav />
        <main>
          <Delivery />
          <Summary />
        </main>
      </div>
    </div>
  );
}

export default App;
