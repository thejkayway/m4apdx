import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

/*
  ⚠️ This is an example of a contact form powered with Netlify serverless functions.
  The backend should be written as a lambda function in $PROJECT_ROOT/netlify/functions
  Be sure to review the Netlify documentation for more information:
  https://www.netlify.com/docs/functions/
*/

const Form = styled.form``

const Field = styled.div`
  margin: 0 0 1em 0;
  width: 100%;
  @media (min-width: ${props => props.theme.responsive.small}) {
    width: 49%;
  }
  input {
    width: 100%;
  }
  ${props =>
    props.required &&
    `
  label::after {
    content:" *";
    color: red;
  }
  `}
`
const FieldSet = styled.fieldset`
  max-width: ${props => props.theme.sizes.maxWidthCentered};
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  input,
  textarea {
    font-family: inherit;
    font-size: inherit;
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
    border-radius: 2px;
    padding: 1em;
    &::-webkit-input-placeholder {
      color: gray;
    }
    &::-moz-placeholder {
      color: gray;
    }
    &:-ms-input-placeholder {
      color: gray;
    }
    &:-moz-placeholder {
      color: gray;
    }
    &:required {
      box-shadow: none;
    }
  }
  &::before {
    content: '';
    background: black;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    transition: 0.2s all;
    opacity: ${props => (props.overlay ? '.8' : '0')};
    visibility: ${props => (props.overlay ? 'visible' : 'hidden')};
  }
`

const Legend = styled.legend`
  margin: 0 0 1em 0;`

const BigField = styled.div`
  width: 100%;
  margin: 0 0 1em 0;
`

const Label = styled.label`
  display: block;
  padding: 0.2em 0em 0.4em 0em;
`

const Message = styled.textarea`
  width: 100%;
  margin: 0 0 1em 0;
  line-height: 1.6;
  min-height: 250px;
  resize: vertical;
`

const Submit = styled.input`
  background: ${props => props.theme.colors.text} !important;
  border: 2px solid ${props => props.theme.colors.text};
  color: white !important;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: ${props => props.theme.colors.text} !important;
    background: ${props => props.theme.colors.highlight} !important;
    border: 2px solid ${props => props.theme.colors.text};
  }
`

const Modal = styled.div`
  background: white;
  padding: 2em;
  border-radius: 2px;
  position: fixed;
  min-width: 75%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  z-index: 99;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  transition: 0.2s all;
  opacity: ${props => (props.visible ? '1' : '0')};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    min-width: inherit;
    max-width: 400px;
  }
  p {
    line-height: 1.6;
    margin: 0 0 2em 0;
  }
`

const Button = styled.div`
  background: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.text};
  font-size: 1em;
  display: inline-block;
  margin: 0 auto;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  padding: 1em;
  border-radius: 2px;
  text-decoration: none;
  transition: 0.2s;
  z-index: 99;
  &:focus {
    outline: none;
  }
  &:hover {
    background: ${props => props.theme.colors.highlight};
    border: 2px solid ${props => props.theme.colors.text};
    color: ${props => props.theme.colors.text};
  }
`

class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      zipCode: '',
      message: '',
      showModal: false,
    }
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = event => {
    fetch('/.netlify/functions/submitContactForm?no-cache=1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: JSON.stringify(this.state),
    })
      .then(this.handleSuccess)
      .catch(error => alert(error))
    event.preventDefault()
  }

  handleSuccess = () => {
    this.setState({
      name: '',
      email: '',
      phoneNumber: '',
      zipCode: '',
      message: '',
      showModal: true,
    })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <Form
        name="contact"
        onSubmit={this.handleSubmit}
        data-netlify="true"
        data-netlify-honeypot="bot"
        overlay={this.state.showModal}
        onClick={this.closeModal}
      >
        <FieldSet>
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don’t fill this out:{' '}
            <input name="bot" onChange={this.handleInputChange} />
          </label>
        </p>
        
          <Legend>Get involved with the Medicare for All Rally!</Legend>
        <Field required>
          <Label>Name</Label>
          <input
            name="name"
            type="text"
            placeholder="Required"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
        </Field>
        <Field required>
          <Label>Email Address</Label>
          <input
            name="email"
            type="email"
            placeholder="Required"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
        </Field>
        <Field>
          <Label>Phone Number</Label>
          <input
            name="phoneNumber"
            type="tel"
            placeholder="111-111-1111"
            // match 1234567890, 123-456-7890, (123)456-7890, (123)-456-7890, (123) 456-7890
            pattern="(?:\([0-9]{3}\)|[0-9]{3})[- ]?[0-9]{3}[- ]?[0-9]{4}"
            value={this.state.phoneNumber}
            onChange={this.handleInputChange}
          />
        </Field>
        <Field>
          <Label>Zip Code</Label>
          <input
            name="zipCode"
            type="text"
            value={this.state.zipCode}
            onChange={this.handleInputChange}
          />
        </Field>
        <BigField>
          <Label>Message</Label>
          <Message
            name="message"
            type="text"
            placeholder="Do you have any special skills or interests? Any questions you'd like answered?"
            value={this.state.message}
            onChange={this.handleInputChange}
          />
        </BigField>
        
        <Submit name="submit" type="submit" value="Send" />
        </FieldSet>
        <Modal visible={this.state.showModal}>
          <p>
            Thank you for reaching out. We will get back to you as soon as
            possible.
          </p>
          <Button onClick={this.closeModal}>Okay</Button>
        </Modal>
        
      </Form>
    )
  }
}

ContactForm.propTypes = {
  data: PropTypes.object,
}

export default ContactForm
