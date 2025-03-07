import { useState, ReactNode, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  wrapperId?: string;
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  // wrapperElement.setAttribute("class", "modal");
  document.body.append(wrapperElement);

  return wrapperElement;
}

function Portal({ children, wrapperId = "portal-wrapper" }: PortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  // хук занимается изменением стейта синхронно
  useLayoutEffect(() => {
    let element = document.getElementById("wrapperId");
    // флаг, чтобы понять создан ли элемент вручную
    let created = false;

    if (!element) {
      created = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (created) {
        element?.remove();
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export default Portal;
