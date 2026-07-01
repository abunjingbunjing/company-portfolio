export default function Button({
  children,
  onClick,
  href,
  variant = "dark",
  className = "",
}) {
  const styles = {
    dark: "bg-black text-white hover:bg-neutral-800",
    light: "bg-white text-black border border-black hover:bg-gray-100",
    primary: "bg-primary text-black hover:opacity-90",
  };

  const classes = `
    inline-flex
    items-center
    justify-center
    rounded-xl
    px-8
    py-4
    font-medium
    transition
    ${styles[variant]}
    ${className}
  `;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}