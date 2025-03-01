import { Button, Form, FormItemProps, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { IContactForm } from "./home-page";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./styles.css";
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

interface IDynamicField {
  editorOption: FormItemProps<string>;
  element: () => React.ReactNode;
}

const initDynamicFields: IDynamicField[] = [
  {
    editorOption: {
      label: "Số điện thoại",
      name: "phone",
    },
    element: () => {
      return <Input />;
    },
  },
  {
    editorOption: {
      label: "Email",
      name: "email",
      rules: [
        {
          type: "email",
          message: "The input is not valid E-mail!",
        },
      ],
    },
    element: () => {
      return <Input />;
    },
  },
];

interface IProps {
  formData: IContactForm | null;
  onSubmit: (data: IContactForm) => void;
  onCancel: () => void;
}

const EditForm = ({ formData, onSubmit, onCancel }: IProps) => {
  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);
  const [listDynamicFields, setListDynamicFields] = useState<IDynamicField[]>(
    []
  );

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

  useEffect(() => {
    if (!formData) return; // Prevent null from causing an error

    if (formData.mode === "create") {
      setListDynamicFields([]);
    } else {
      const storeInitFieldWithDetailContact: IDynamicField[] = [];
      for (const [key, val] of Object.entries(formData)) {
        if (["phone", "email"].includes(key) && val) {
          const getFieldInvolve: IDynamicField | undefined =
            initDynamicFields.find((f) => f.editorOption.name === key);
          if (getFieldInvolve) {
            storeInitFieldWithDetailContact.push(getFieldInvolve);
          }
        }
      }
      setListDynamicFields(storeInitFieldWithDetailContact);
    }
  }, [formData, onCancel]);

  const onFinish = (values: IContactForm) => {
    const listCheckHasFieldRemoved = initDynamicFields
      .filter((f) => {
        const isRemoved = listDynamicFields.find(
          (_f) => _f.editorOption.name === f.editorOption.name
        );
        return !isRemoved;
      })
      .map((f) => f.editorOption.name);

    const formValue = {
      ...values,
      mode: formData?.mode ?? "create",
    };
    for (const f of listCheckHasFieldRemoved as string[]) {
      // @ts-expect-error
      formValue[f] = "";
    }

    onSubmit(formValue);
  };

  const handleAddDynamicField = () => {
    setListDynamicFields((prev) => {
      if (prev.length === 0) {
        return [
          {
            ...initDynamicFields[0],
          },
        ];
      } else {
        const isExistField = initDynamicFields.find((f) => {
          const isExist = prev.find(
            (fPrev) => fPrev.editorOption.name === f.editorOption.name
          );
          return !isExist;
        });
        if (!isExistField) return prev;
        return [...prev, isExistField];
      }
    });
  };

  const handleDeleteDynamicField = (fieldName: string) => () => {
    setListDynamicFields((prev) => {
      const newFieldAfterRemoving = prev.filter(
        (fPrev) => fPrev.editorOption.name !== fieldName
      );

      return newFieldAfterRemoving;
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

      {listDynamicFields.map((f: IDynamicField) => {
        return (
          <div
            key={f.editorOption.name as string}
            className="container_dynamic_field"
          >
            <Form.Item {...f.editorOption}>{f.element()}</Form.Item>

            <MinusCircleOutlined
              className="dynamic-delete-button"
              onClick={handleDeleteDynamicField(f.editorOption.name as string)}
            />
          </div>
        );
      })}
      <div className="text-center">
        <Button
          className="mb-[10px]"
          onClick={handleAddDynamicField}
          type="primary"
          icon={<PlusOutlined />}
          disabled={listDynamicFields.length === initDynamicFields.length}
        >
          Add field
        </Button>
      </div>

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
