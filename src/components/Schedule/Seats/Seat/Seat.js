import './Seat.css';
import AvailableSeat from "../../../../assets/images/available-seat.png";
import SelectedSeat from "../../../../assets/images/selected-seat.png";
import TakenSeat from "../../../../assets/images/taken-seat.png";
import React, {useState} from "react";

const Seat = (props) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleSeatSelection = () => {

        if(!props.reserved) {
            var seat = document.getElementById(props.id);
            if(!isSelected) {
                seat.classList.remove("available");
                seat.classList.add("selected")
            }
            else {
                seat.classList.remove("selected");
                seat.classList.add("available")
            }
            let isDisabled = document.getElementsByClassName("selected").length === 0;
            props.changeIsDisabled(isDisabled);
            setIsSelected(!isSelected)
        }

    }

    return (
        <img alt="seat" id={props.id} className={"img-fluid px-1 " + !props.reserved ? "available" : "reserved"} onClick={() => handleSeatSelection()} src={props.reserved ? TakenSeat : !isSelected ? AvailableSeat : SelectedSeat}
             style={{transform: 'rotate(180deg)',marginRight: "10px", marginLeft: "10px", maxWidth: '7%', cursor: props.reserved ? "default" : "pointer"}}/>
    );
}

export default Seat;
