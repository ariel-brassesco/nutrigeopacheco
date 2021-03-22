import React, { FC } from "react";
import { Formik, Form, Field } from "formik";

type Props = {
  filterBy: (data: string) => void;
};

interface Values {
  search: string;
}

export const SearchProduct: FC<Props> = ({ filterBy }) => {
  const handleSubmit = (values: Values) => {
    filterBy(values.search);
  };

  return (
    <Formik<Values>
      initialValues={{ search: "" }}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ submitForm }) => (
        <Form>
          <div className="field has-addons is-flex">
            <div className="control is-flex-grow-1">
              <Field
                className="input"
                type="text"
                name="search"
                placeholder="Buscar Producto..."
              />
            </div>
            <div className="control">
              <button
                className="button is-success"
                type="submit"
                onClick={submitForm}
              >
                <span className="icon">
                  <i className="fas fa-search"></i>
                </span>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
