import { useGetProductByIdQuery,useUpdateProductMutation } from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { Button, Form, Input, Skeleton } from "antd";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
type FieldType = {
    name: string;
    price: number;
    categoryId:string;
};
const EditProduct = () => {
    const { idProduct } = useParams<{ idProduct: string }>();
    const { data: productData, isLoading } = useGetProductByIdQuery(idProduct || "");
    const [updateProduct] = useUpdateProductMutation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
  console.log(productData);
  

    useEffect(() => {
        form.setFieldsValue({
            name: productData?.name,
            price: productData?.price,
            categoryId:productData?.categoryId,     
        });
    }, [productData]);
    console.log(productData?.categoryId);
    
    const onFinish = (values: IProduct) => {
        updateProduct({ ...values, _id: idProduct })
            .unwrap()
            .then(() => navigate("/admin/products"));
    };
    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Sửa sản phẩm : {productData?.data.name}</h2>
            </header>
            {isLoading ? (
                <Skeleton />
            ) : (
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                            { min: 3, message: "Sản phẩm ít nhất 3 ký tự" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> label="Giá sản phẩm" name="price">
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType> label="categoryId" name="categoryId">
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" danger htmlType="submit">
                            {isLoading ? (
                                <AiOutlineLoading3Quarters className="animate-spin" />
                            ) : (
                                "Thêm"
                            )}
                        </Button>
                        <Button
                            type="primary"
                            danger
                            className="ml-2 "
                            onClick={() => navigate("/admin/products")}
                        >
                            Quay lại
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default EditProduct;