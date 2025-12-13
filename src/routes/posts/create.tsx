import { createPost } from "@/functions/post.functions";
import { PostDTO } from "@/schemas/post.schema";
import { useAuthStore } from "@/stores.ts/authStore";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//  const item = localStorage.getItem("auth");
export const Route = createFileRoute("/posts/create")({
  beforeLoad() {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      // console.log('Not Authenticated');
      throw redirect({ to: "/account" });
    }
  },
  component: RouteComponent,
});
const initialValues: PostDTO = {
  title: "",
  description: "",
};
function RouteComponent() {
  const createTodoFn = useServerFn(createPost);
  const router = useRouter();
  const m = useMutation({
    mutationFn: (values: PostDTO) => {
      return createTodoFn({
        data: {
          title: values.title,
          description: values.description,
        },
      });
    },
    onSuccess: (result) => {
      // console.log("RESULT FROM SERVER:", result);
      router.navigate({ to: "/posts" });
    },
    onError: (err) => {
      console.log("Error encountered");
    },
  });
  const handleSubmit = (values: PostDTO) => {
    m.mutate(values);
  };
  return (
    <div className="grid grid-cols-1">
      <h1>Create Post</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({}) => (
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
