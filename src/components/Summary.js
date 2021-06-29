import Cart from "./Cart";
function Summary(props){
  return (
    <>
      <Cart show={false} click={props.click}></Cart>
    </>
  )
}

export default Summary