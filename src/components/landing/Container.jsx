export default function Container({
  as: Component = "div",
  className = "",
  children,
}) {
  return (
    <Component className={`mx-auto w-full px-4 md:px-14 ${className}`}>
      {children}
    </Component>
  );
}
