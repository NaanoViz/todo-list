import styled from "styled-components";

const StyledLabel = styled.label`
padding: 5px 0;
margin-bottom: 5px;
margin-top: 6px;
`; 
const StyledInput = styled.input`
padding: 5px 0;
margin-bottom: 5px;
margin-top: 6px;
`;

function TextInputWithLabel({

    elementId,
    ref,
    onChange,
    label,
    value,
    
})
{
    return (
        <>
        <StyledLabel htmlFor={elementId}>{label}</StyledLabel>
        <StyledInput 
        type="text" 
        id={elementId}
        ref={ref}
        onChange={onChange}
        value={value}

        />
        </>
    )
};

export default TextInputWithLabel 