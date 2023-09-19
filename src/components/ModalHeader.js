import { Col, Row } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { ReactComponent as closeIcon } from "../accets/images/modal-close-icon.svg";

export default function ModalHeader({ title, subtitle, onClose}) {
    return (
        <div style={{ marginBottom: "21px" }}>
            <Row justify={"space-between"} style={{ marginBottom: "10px" }}>
                <Col span={22}>
                    <UnorderedListOutlined
                        style={{
                            color: "#4b4b4b",
                            marginRight: "10px",
                            fontSize: "20px",
                        }}
                    />
                    <span className="modal-title">{title}</span>
                </Col>
                <Col span={2} style={{ textAlign: "right" }}>
                    <Icon
                        onClick={onClose}
                        component={closeIcon}
                        style={{ fontSize: "20px" }}
                    />
                </Col>
            </Row>
            <div className="modal-subtitle">{subtitle}</div>
        </div>
    );
}
