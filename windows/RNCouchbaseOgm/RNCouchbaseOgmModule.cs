using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Com.Reactlibrary.RNCouchbaseOgm
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNCouchbaseOgmModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNCouchbaseOgmModule"/>.
        /// </summary>
        internal RNCouchbaseOgmModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNCouchbaseOgm";
            }
        }
    }
}
