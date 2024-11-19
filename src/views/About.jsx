const About = () => {
	return (
		<div className="h-screen w-full bg-[#101110] text-white flex flex-col justify-center items-center">
			<div>
				<h1 className="text-3xl font-thin mb-4">Side Project!</h1>
				<p className="text-lg font-thin">This is another clone of mine. I loved the look of LS's <a href="https://drafting.gg" className="text-yellow-600">drafting.gg</a> but thought some of the functionality was a little unintuitive or could just be improved upon.</p>
				<p className="text-lg font-thin">I functionally changed two things from the original webapp:</p>
				<div className="p-6">
					<p className="text-lg font-thin">- Added the ability to drag and drop champions onto picks and bans.</p>
					<p className="text-lg font-thin">- Changed the position filters to allow for multiple positions to be selected at once.</p>
					<span className="font-thin italic">(Champions shown are those that could be placed in any of the selected positions)</span>
				</div>
				<p className="text-lg font-thin">Thank you very much for checking this out and don't forget to show the original creators some love!</p>
			</div>
		</div>
	)
}

export default About;