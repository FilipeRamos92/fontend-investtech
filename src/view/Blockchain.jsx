import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';

import { ethers } from "ethers";

const Blockchain = () => {
    const [accountBalance, setAccountBalance] = useState(0);

    let provider = new ethers.providers.Web3Provider(window.ethereum)
    let signer;

    const daiAddress = "0x9c686adc83af6bc179a2c7ef6fdcfe4d2f1ce7d6";
    const daiAbi = [
        "function getPlByDate(uint256 _date) public view returns (uint _pl)",
        "function addPlByDate(uint _date, uint pl) public",
        "function addPlByDateStruct(uint _date, uint _pl) public",
    ];

    useEffect(async () => {
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner()


        // let balance = await provider.getBalance("ethers.eth")

        // setAccountBalance(balance);
        // console.log(`Balance: ${balance}`);
        // console.log(`Type of Balance: ${typeof(balance)}`);
        // setAccountBalance(ethers.utils.formatEther(balance));
        // console.log(parseInt(balance.toBigInt()));
        // setAccountBalance(parseInt(balance));
        // setAccountBalance(parseInt(balance));
    },[])

    

    // The ERC-20 Contract ABI, which is a common contract interface
    // for tokens (this is the Human-Readable ABI format)


    const [date, setDate] = useState(0);

    async function getSeila() {
        const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

        // let valor = await daiContract.getPlByDate(11);

        // let valor = await daiContract.getPlByDate(20220310);
        let valor = await daiContract.getPlByDate(date);
        console.log("FEZ A CONSULTA");
        console.log(valor);

        //pegar valor
        //botar navariavel
        setAccountBalance(ethers.utils.formatUnits(valor, 0));
    }

    async function fazerTranzacao() {
        try {
            const contract = new ethers.Contract(daiAddress, daiAbi, provider);
            const daiWithSigner = contract.connect(signer);
            await daiWithSigner.addPlByDate(20220311, 666);
        } catch (err) {
            console.log('capiroto ta agindo');
        }
    }

    return (
        <Container>
            <input value={date} onChange={(event) => setDate(event.target.value)} type="text" />
            <Button onClick={() => getSeila()}>
                Pegar Resultado
            </Button>
            <br />



            <Button onClick={() => fazerTranzacao()}>
                Enviar Transação
            </Button>
            <br />
            <span>Resultado: {accountBalance}</span>
        </Container>
    );
}

export default Blockchain;