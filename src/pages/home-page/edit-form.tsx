import { Button, Form, Input, Space } from "antd";
import { useEffect } from "react";
import { IContactForm } from "./home-page";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

interface IProps {
  formData: IContactForm | null;
  onSubmit: (data: IContactForm) => void;
  onCancel: () => void;
}

const EditForm = ({ formData, onSubmit, onCancel }: IProps) => {
  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);
  useEffect(() => {
    form.setFieldsValue({
      city: formData?.city ?? "",
      company: formData?.company ?? "",
      district: formData?.district ?? "",
      email: formData?.email ?? "",
      firstname: formData?.firstname ?? "",
      id: formData?.id ?? "",
      lastname: formData?.lastname ?? "",
      phone: formData?.phone ?? "",
      street: formData?.street ?? "",
      address: formData?.address ?? "",
      mode: formData?.mode ?? "create",
    });
  }, [formData, onCancel]);
  const onFinish = (values: IContactForm) => {
    onSubmit({
      ...values,
      mode: formData?.mode ?? "create",
    });
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      variant={variant || "filled"}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        variant: "filled",
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Họ"
        name="firstname"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tên"
        name="lastname"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Công ty" name="company" rules={[]}>
        <Input />
      </Form.Item>

      <Form.Item label="Điện thoại" name="phone" rules={[]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <div>
        <div className="mb-[20px]">
          <p className="font-bold">Nhập thông tin Địa chỉ</p>
        </div>
        <div className="">
          <Form.Item label="Tỉnh/TP" name="city" rules={[]}>
            <Input />
          </Form.Item>

          <Form.Item label="Quận/Huyện" name="district" rules={[]}>
            <Input />
          </Form.Item>

          <Form.Item label="Đường/Phố" name="street" rules={[]}>
            <Input />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address" rules={[]}>
            <Input />
          </Form.Item>
        </div>
      </div>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space size={10}>
          <Button
            onClick={() => {
              onCancel();
            }}
          >
            Exit
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default EditForm;
