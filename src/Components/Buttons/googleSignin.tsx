import GoogleIcon from "next/image"
interface Props{
    height:number,
    width:number,
    onClick:()=>void,
    labelstring:string
}
export default function Signinbutton(props:Props):JSX.Element{

    function handleClick(){
        props.onClick()
    }
    const styles={
        signinbuttoncontainer:{
            backgroundColor:"rgb(26,139,246)",
            width:200,
            height:props.height,
            marginTop:10,
            color:"white",
            fontWeight:900,
            display:"flex",
            justifyContent:"center",
            alignItems:"center"

        },
        innercontainer:{
            backgroundColor:"white",
            marginRight:30,
            
        }
    }
    return(
        <div style={styles.signinbuttoncontainer} onClick={handleClick}>
            <div style={styles.innercontainer}>
                <GoogleIcon src="/google-icon.svg" alt="my svg" width={25} height={20}/>
            </div>
            <p>{props.labelstring}</p>
        </div>
    )
}