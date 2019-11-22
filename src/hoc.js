import React from "react";
import ReactDOM from "react-dom";

export function createPortalComponent(Component, rootElement) {
  return function PortalComponent(props) {
    const reactElement = ReactDOM.createPortal(
      <Component {...props} />,
      rootElement
    );
    return reactElement;
  };
}

export function withContextComponent(Context, Component) {
  return function ComponentWithContext(componentProps) {
    return (
      <Context.Consumer>
        {ctx => {
          const props = {
            ...componentProps,
            ...ctx
          };
          return <Component {...props} />;
        }}
      </Context.Consumer>
    );
  };
}

export function withContextPortal(Context, Component, rootElement) {
  const PortalComponent = createPortalComponent(Component, rootElement);
  return withContextComponent(Context, PortalComponent);
}
