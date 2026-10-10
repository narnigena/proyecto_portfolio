//componente que controla las categorías al seleccionar cada servicio de diseño
function ProjectFilters({
    categories = [],
    activeFilter,
    onFilterChange
}) {

    return (

        <div
            className="
                flex
                flex-wrap
                gap-3
                mb-12
            "
        >

            {categories.map(category => (

                <button
                    key={category}
                    type="button"
                    onClick={() => onFilterChange(category)}
                    className={`
                        px-4
                        py-2
                        text-sm
                        uppercase
                        tracking-wide
                        transition-colors
                        duration-200

                        ${
                            activeFilter === category

                                ? `
                                    bg-primary
                                    text-white
                                  `

                                : `
                                    border
                                    border-gray-300
                                    text-gray-700
                                    hover:bg-gray-100
                                  `
                        }
                    `}
                >

                    {category}

                </button>

            ))}

        </div>

    );

}


export default ProjectFilters;