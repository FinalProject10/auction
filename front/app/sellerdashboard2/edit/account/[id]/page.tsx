"use client"
import Formulaire from "../../formulaire"
import {useState} from "react"

export default function EditAccount(){
    const [firstName,setFirstName]=useState<string>("")
    const [lastName,setLastName]=useState<string>("")
    const [email,setEmail]=useState<string>("")
    const [currentpass,setCurrentpass]=useState<string>("")
    const [newPass,setNewPass]=useState<string>("")
    const [confirmpass,setConfirmpass]=useState<string>("")
    const userToEdit={
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:newPass
    }
    return (
        <Formulaire   confirmpass={confirmpass} newPass={newPass} objectToEdit={userToEdit} head={'Edit Account'} />
    )
}