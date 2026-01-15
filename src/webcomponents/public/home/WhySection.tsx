/* eslint-disable react/no-unescaped-entities */
export const WhySection = () => {
  return (
    <section className="py-16 bg-[#FAFAFA]">
      <div className="container mx-auto px-6 ">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Why We Exist */}
          <div className="space-y-6 shadow-md p-3.5 rounded-l-md rounded-r-md rounded-t-md rounded-b-md">
            <h3 className="text-3xl font-bold">Why We Exist</h3>
            <p className="leading-relaxed">
              Here at The Art of Reform®, our goal is to help unite society by
              changing prisons and the way people view prisoners/felons.
            </p>
            <p className=" leading-relaxed">
              In order to do that, we must first solve two key problems:
            </p>
            <ol className="list-decimal list-inside space-y-3 ">
              <li>
                The prison drug trade that has consumed and ravaged the entire
                incarcerated community, causing endless pain and death to both
                user and dealer alike.
              </li>
              <li>
                The systematic injustices and malpractices taking place
                throughout prisons, stripping prisoners of their hope for
                humanity and sense of belonging in the world.
              </li>
            </ol>
            <p className=" font-semibold">So, how do we plan to do that?</p>
            <ul className="space-y-3 ">
              <li>
                • Presenting prisoners with the opportunity to support
                themselves financially in a positive and constructive manner
                through their own creation of artwork
              </li>
              <li>
                • Helping prisoners recapture the meaning of their lives, make
                good use of their time incarcerated, develop social skills, and
                foster positive relationships
              </li>
              <li>
                • Offering a space to connect all who share the common goal of
                reforming prisons. Prisoners and their loved ones will be able
                to join forces with reformers throughout the country, together
                shining a light on the current issues in prisons and bringing a
                stop to the injustices.
              </li>
            </ul>
          </div>

          {/* Why It Matters */}
          <div className="space-y-6 shadow-md p-3.5 rounded-md">
            <h3 className="text-3xl font-bold">Why It Even Matters?</h3>
            <p className=" leading-relaxed">
              Incarcerated people are still people. They are still a part of our
              society and they will be released back into our communities one
              day.
            </p>
            <p className=" leading-relaxed">
              How many of them do you think will feel isolated in society like
              they're less than, no good, useless? How many of them have never
              experienced love, support, understanding or appreciation?
            </p>
            <p className=" leading-relaxed">
              Our dream is to give every person in the system those experiences.
              They will walk out of those gates ready to be a positive member of
              society with our support system cheering them on and counting on
              them to do great things.
            </p>
            <p className=" leading-relaxed">
              If we want real reform, we must change the way people feel about
              themselves and their lives. We have to change the entire system
              from the inside out, reframing the minds of everyone involved
              along the way.
            </p>
            <p className=" font-semibold italic">
              We didn't invent prison reform. We just discovered there's an art
              to it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
