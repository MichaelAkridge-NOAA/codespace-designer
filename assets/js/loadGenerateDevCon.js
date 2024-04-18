function generateDevContainerJSON() {
    const name = document.getElementById('nameField').value;
    const workspaceFolder = document.getElementById('workspaceField').value;
    const cpus = document.getElementById('cpuSelector').value;
    const extensions = Array.from(document.getElementById('extensionSelector').selectedOptions).map(opt => opt.value);
    const rawPorts = document.getElementById('ports').value;
    const ports = rawPorts.split(',').map(port => port.trim()).filter(port => port !== ''); // Filters out empty entries
    const updateContentCommand = document.getElementById('updateContentCommand').value;
    const postCreateCommand = document.getElementById('postCreateCommand').value;
    const postStartCommand = document.getElementById('postStartCommand').value;

    // Prepend the text to the selected image value
    const baseImageURL = "ghcr.io/nmfs-opensci/";
    const selectedImage = document.getElementById('packageSelector').value;
    const image = baseImageURL + selectedImage;

    const devContainerConfig = {
        "name": name,
        "workspaceFolder": workspaceFolder,
        "image": image,
        "hostRequirements": {
            "cpus": parseInt(cpus)
        },
        "customizations": {
            "vscode": {
                "extensions": extensions
            }
        },
        "updateContentCommand": updateContentCommand,
        "postCreateCommand": postCreateCommand,
        "postStartCommand": postStartCommand
    };

    // Add ports only if there are valid entries
    if (ports.length > 0) {
        devContainerConfig.forwardPorts = ports.map(Number);
        devContainerConfig.portsAttributes = {};
        ports.forEach(port => {
            devContainerConfig.portsAttributes[port] = {
                "label": image,
                "onAutoForward": "openPreview"
            };
        });
    }

    // Output the JSON configuration in a formatted way
    globalJSON = JSON.stringify(devContainerConfig, null, 2); // Store JSON in global variable for download
    document.getElementById('output').textContent = globalJSON;
    document.getElementById('downloadBtn').style.display = 'inline-block';  // Show the download button
}
