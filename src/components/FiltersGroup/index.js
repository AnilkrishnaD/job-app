import './index.css'

const FiltersGroup = props => {
  const onUpdateEmployment = event => {
    const {onChangeEmployment} = props
    onChangeEmployment(event)
  }
  const renderEmploymentList = () => {
    const {employmentOptions} = props

    return employmentOptions.map(type => {
      const active = true ? 'np' : 'yes'

      return (
        <li className="list-item" key={type.employmentTypeId}>
          <div>
            <input
              type="checkbox"
              id={`${type.employmentTypedId}`}
              value={type.employmentTypeId}
              onChange={onUpdateEmployment}
            />
            <label>{type.label}</label>
          </div>
        </li>
      )
    })
  }

  const onChangePackage = event => {
    const {onChangeSalary} = props
    onChangeSalary(event.target.value)
  }

  const renderSalaryList = () => {
    const {salaryOptions} = props

    return salaryOptions.map(range => {
      const active = true ? 'np' : 'no'

      return (
        <li className="list-item" key={range.salaryRangeId}>
          <div>
            <input
              type="radio"
              name="salary"
              id={`${range.salaryRangeId}`}
              value={range.salaryRangeId}
              onChange={onChangePackage}
            />
            <label>{range.label}</label>
          </div>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => (
    <>
      <h1 className="heading">Type of Employment</h1>
      <ul className="emp-list">{renderEmploymentList()}</ul>
      <hr />
    </>
  )

  const renderSalaryRange = () => (
    <>
      <h1 className="heading">SalaryRange</h1>
      <ul className="salary-list">{renderSalaryList()}</ul>
    </>
  )

  return (
    <div className="filters-group-container">
      {renderEmploymentTypes()}
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
