import React, {useState, useEffect} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import EventCard from "../commons/EventCard";
import hrAppBackend from "../../apis/hrAppBackend";

export default () => {

    let events = [
        {title: "Shift", start: "2020-09-20", allDay: true},
        {title: "Partyyyy", start: "2020-09-20", allDay: true}
    ]

    const [monthEvents, updateMonthEvents] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [activeEmployee, setActiveEmployee] = useState(1);
    const [selectedDate, setSelectedDate] = useState("");

    const handleDateClick = (info) => {
        // alert(info.dateStr);
        setOpenModal(true);
        setSelectedDate(info.dateStr);
    }

    useEffect(() => {
        // updateMonthEvents()
        hrAppBackend.get('/schedule')
        .then(success => {
            if(success.data.length){
                const events = success.data.map((event) => {
                    return {
                        title: "Shift",
                        start: event['fromDate'],
                        end: event['toDate']
                    }
                })
                updateMonthEvents(events);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    console.log(monthEvents);

    return <div>
            <EventCard show={openModal} onHide={()=>setOpenModal(false)} selectedDate={selectedDate}/>
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                dateClick={(info)=>handleDateClick(info)}
                selectable={true}
                editable={true}
                events={monthEvents}
            />
        </div>
}