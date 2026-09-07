function SectionHeading({ index, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto mb-14 max-w-2xl text-center" : "mb-14 max-w-2xl"}>
      <p className="mb-3 text-xs font-medium tracking-[0.28em] text-primary uppercase">
        {index}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeading
