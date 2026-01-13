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
        <label htmlFor={elementId}>{label}</label>
        <input 
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