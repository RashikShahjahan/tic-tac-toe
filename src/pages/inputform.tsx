interface InputFormProps {
    computerMode: boolean
}

function InputForm(props: InputFormProps){
    return(
        <div>

        {    
            !props.computerMode &&
            <form>
                Enter P1 Name:
                <input type="text"/>
                Enter P2 Name:
                <input type="text"/>
            </form>
        }
        {
            props.computerMode &&
            <form>
                Enter Name:
                <input type="text"/>
            </form>
        }
        </div>
    );
}

export default InputForm