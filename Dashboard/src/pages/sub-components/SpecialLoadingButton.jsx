/* eslint-disable react/prop-types */

const SpecialLoadingButton = ({content}) => {
  return (
    <div className="flex items-center">
      <button className="text-xl">{content}<span className="loading loading-spinner text-primary"></span></button>
    </div>
  )
}

export default SpecialLoadingButton