import {Dropdown, DropdownButton} from "react-bootstrap";
import React from "react";

const Button = (props) => {
  return (
    <div className='button'>
      <DropdownButton id="dropdown-item-button"
                      title={`currencies`}
                      variant={'success'}>
        {Object.entries(props.symbols).map(([key, name]) =>
          <Dropdown.Item key={key} onClick={props.showCurrency.bind(null, [key, name])}>{name}</Dropdown.Item>
        )}
      </DropdownButton>
    </div>

  )
}
export default Button
