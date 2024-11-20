import styled from "styled-components";

export const Dashboard = styled.section`
height: 100%;
width: 75%;
float: right;
padding: 1rem;
display: flex;
justify-content: end;
gap: 2rem;
`

export const LeftData = styled.div`
height: 100%;
width: 75%;


`

export const Title = styled.h1`
font-size: 1.5rem;
font-weight: 600;

`

export const TopChart = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: space-between;
align-items: center;
gap: 1rem;

`

export const LeftChart = styled.div`
width: 50%;
height: 100%;
display: flex;
justify-content: start;
align-items: start;
gap: 1rem;
border: 1px solid #717171;
border-radius: 1rem;
`

export const DataRight = styled.div`
width: 60%;
height: 100%;
display: flex;
justify-content: start;
align-items: start;
gap: .5rem;
flex-direction: column;

h3{
    font-size: 1.2rem;
    font-weight: 500;
    color: #717171;
}
h1{
    font-size: 2rem;
    font-weight: 700;
    color: #000000;
}
`

export const MidChart = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: start;
align-items: start;
flex-direction: column;
margin-top: 1rem;
/* gap: .5rem; */

`

export const ChartTopMid = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: start;
flex-direction: column;
padding: 1rem;
gap: 1rem;

h1{
    font-size: 2rem;
    font-weight: 700;
    color: #000000;
}
p{
    font-size: 1.2rem;
    font-weight: 500;
    color: #717171;
}
`


export const BottomChart = styled.div`
width: 100%;
height: 100%;

`

export const RightData = styled.div`
width: 40%;
height: 100%;
`

export const OverAllTask = styled.div`
width: 100%;
height: 100%;
padding: .5rem;
display: flex;
justify-content: start;
align-items: start;
flex-direction: column;
gap: 1rem;
border: 1px solid #717171;
border-radius: 1rem;
`

export const Heading = styled.h1`
font-size:1rem;
font-weight: 500;
color: #717171;
`

export const Content = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: space-between;
align-items: center;

h1{
    font-size: 1.5rem;
    font-weight: 700;
}

button{
    padding: .5rem 1rem;
    background-color: transparent;
    border: 1px solid #717171;
    color: #000;
    border: none;
    border-radius: .5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
}
`