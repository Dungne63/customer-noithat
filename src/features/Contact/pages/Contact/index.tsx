import { FC } from "react";
import useContact, { Props, ReceivedProps } from "./hook";

const ContactLayout: FC<Props> = ({ ...props }) => {
  return <div>Contact</div>;
};

const Contact: FC<ReceivedProps> = (props) => (
  <ContactLayout {...useContact(props)} />
);

export default Contact;
