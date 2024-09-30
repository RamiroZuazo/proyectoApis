const SectionHeader = ({ title, description, showButton = true, buttonText, ModalComponent, addMember }) => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between py-4 border-b md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-2xl font-bold">{title}</h3>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
        {showButton && ModalComponent && (
          <div className="mt-6 md:mt-0">
            <ModalComponent
              triggerText={buttonText}
              triggerIcon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              }
              modalTitle={buttonText}
              buttonText={buttonText}
              buttonStyle="text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700"
              addMember={addMember} // Pasa la función addMember al modal
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
