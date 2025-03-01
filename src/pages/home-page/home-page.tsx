import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-store/store";
import { Button, Modal, Popconfirm, Table } from "antd";
import { useState } from "react";
import { IContact } from "../../type/contact";
import { TableRowSelection } from "antd/es/table/interface";
import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Dispatch } from "@reduxjs/toolkit";
import {
  addContact,
  removeContact,
  updateContact,
} from "../../redux-store/contact-redux";
import { CONSTANT } from "../../const/constant";
import { CommonUtil } from "../../utils/utils";
import EditForm from "./edit-form";
import { useNotification } from "../../hooks/useNotification";

type DataType = Omit<IContact, "id"> & {
  id: React.Key | string;
};

type ModePopup = "create" | "update";

export interface IContactForm extends IContact {
  mode: ModePopup;
}

const HomePage = () => {
  const contacts = useSelector((state: RootState) => {
    const localContact = CommonUtil.getLocalStorage(CONSTANT.LS_CONTACT);
    if (!localContact) {
      return state.contact;
    }
    return localContact;
  });
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const dispatch: Dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [detailContact, setDetailContact] = useState<IContactForm | null>(null);

  const columns = [
    {
      title: "",
      dataIndex: "id",
      width: 150,
      render: (data: string) => {
        return (
          <div>
            <Button
              onClick={handleUpdateContact(data)}
              type="text"
              danger
              icon={<EditOutlined />}
            ></Button>
            <Popconfirm
              title="Delete contact"
              description="Are you sure to delete this contact?"
              onConfirm={handleDeleteContact(data)}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button
                // onClick={handleDeleteContact(data)}
                type="text"
                danger
                icon={<DeleteOutlined />}
              ></Button>
            </Popconfirm>

            <Button
              onClick={handleExportJson(data)}
              type="text"
              danger
              icon={<FileOutlined />}
            ></Button>
          </div>
        );
      },
    },
    {
      title: "firstname",
      dataIndex: "firstname",
    },
    {
      title: "lastname",
      dataIndex: "lastname",
    },

    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "company",
      dataIndex: "company",
    },

    {
      title: "city",
      dataIndex: "city",
    },
    {
      title: "district",
      dataIndex: "district",
    },
    {
      title: "street",
      dataIndex: "street",
    },
    {
      title: "address",
      dataIndex: "address",
    },
  ];

  const handleAddContact = () => {
    const randomId = Date.now().toString();
    setDetailContact({
      id: randomId,
      city: "",
      company: "",
      district: "",
      email: "",
      firstname: "",
      lastname: "",
      phone: "",
      street: "",
      address: "",
      mode: "create",
    });
  };

  const handleUpdateContact = (id: string) => () => {
    const data =
      contacts.find((contact: IContact) => contact.id === id) || null;
    setDetailContact({ ...data, mode: "update" });
  };

  const handleDeleteContact = (id: string) => () => {
    dispatch(removeContact(id));
  };

  const handleExportJson = (id: string) => () => {
    const data = contacts.find((c: IContact) => c.id === id);
    const json = CommonUtil.formJson(data);
    CommonUtil.downloadFile(json);
  };

  const handleRowSelectChange = (keys: React.Key[]) => {
    setSelectedRowKeys(keys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys: selectedRowKeys,
    onChange: handleRowSelectChange,
  };

  const handleSubmit = (data: IContact) => {
    const formData = {
      ...detailContact,
      ...data,
      id: detailContact?.id || "",
    };

    // validate
    //

    if (formData.mode === "update") {
      dispatch(updateContact(formData));
      openNotificationWithIcon("success", {
        message: "Update Success",
        description: "You have successfully ",
      });
    } else {
      dispatch(addContact(formData));
      openNotificationWithIcon("success", {
        message: "Create New Success",
        description: "You have successfully ",
      });
    }
    setDetailContact(null);
  };

  const handleCancel = () => {
    setDetailContact(null);
  };

  return (
    <div className="m-[10px]">
      {contextHolder}
      <Button
        className="mb-[10px]"
        onClick={handleAddContact}
        type="primary"
        icon={<PlusOutlined />}
      >
        Add
      </Button>
      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={contacts}
        rowKey="id"
      ></Table>
      <Modal
        title={
          detailContact?.mode === "create"
            ? "Create new contact"
            : "Update contact"
        }
        centered
        open={!!detailContact?.id}
        onCancel={handleCancel}
        // footer={undefined}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <EditForm
          formData={detailContact}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default HomePage;
